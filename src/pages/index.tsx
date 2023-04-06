import Layout from "@/components/Layout";
import Head from "next/head";
import Filter from "@/components/Filter";
import { CircularProgress, Container, Box, Pagination } from "@mui/material";
import * as React from "react";
import SChip from "@/components/SChip";
import { GetStaticProps } from "next";
import useAxios from "axios-hooks";
import ProductsList from "@/components/ProductsList";
import { useAppContext } from "@/context";

interface HomeProps {
  categories: Category[];
}

export default function Home({ categories }: HomeProps) {
  const [currentCategory, setCurrentCategory] = React.useState<string>("");
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const { query } = useAppContext();
  const tagsParams = selectedTags.map((tag) => tag.name);
  const [{ data: tags = { data: [] } }] = useAxios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/tags`,
    params: { category: currentCategory },
  });
  const LIMIT: number = 6;
  const [{ loading, data: products = { data: [] } }] = useAxios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
    params: {
      category: currentCategory,
      tags: tagsParams,
      limit: LIMIT,
      skip: (currentPage - 1) * LIMIT,
    },
  });
  const COUNT: number = Math.ceil(products?.count / LIMIT);

  return (
    <Layout>
      <Head>
        <title>Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxWidth="md" sx={{ width: "95%" }}>
          {JSON.stringify(query)}
          <Filter
            {...{ currentCategory, categories }}
            handleChange={(value) => {
              setCurrentCategory(value);
              setSelectedTags([]);
              setCurrentPage(1);
            }}
          />
          <Box display={"flex"} gap={1} width={"100%"} flexWrap={"wrap"}>
            {tags?.data?.map((tag: Tag) => {
              const isDeletable = selectedTags?.includes(tag);
              return (
                <SChip
                  key={tag._id}
                  onDelete={() => {
                    setSelectedTags(
                      selectedTags?.filter((item) => item._id !== tag._id)
                    );
                    setCurrentPage(1);
                  }}
                  onClick={() => {
                    setSelectedTags([...selectedTags, tag]);
                    setCurrentPage(1);
                  }}
                  isDeletable={isDeletable ? true : false}
                  label={tag.name}
                />
              );
            })}
          </Box>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              }}
            >
              <CircularProgress sx={{ mx: "auto" }} />
            </Box>
          ) : (
            <ProductsList products={products?.data} />
          )}
          <Pagination
            disabled={loading}
            count={COUNT}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            style={{ margin: "30px 0" }}
            color={"primary"}
            shape={"rounded"}
          />
        </Container>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
  );
  const { data } = await response.json();

  return { props: { categories: data } };
};
