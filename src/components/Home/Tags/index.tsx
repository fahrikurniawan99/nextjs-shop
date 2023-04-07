import SChip from "@/components/ui/SChip";
import { productState } from "@/stores/product";
import { Box } from "@mui/material";
import axios from "axios";
import { useAtom } from "jotai";
import * as React from "react";

export default function Tags() {
  const [product, setProduct] = useAtom(productState);
  const [tags, setTags] = React.useState<Tag[]>();

  React.useEffect(() => {
    axios(`${process.env.NEXT_PUBLIC_API_URL}/api/tags`, {
      params: {
        category: product.category,
      },
    }).then((res) => {
      setTags(res.data.data);
    });

    return () => {};
  }, [product.category]);

  return (
    <Box display={"flex"} gap={1} width={"100%"} flexWrap={"wrap"}>
      {tags &&
        tags.map((tag: Tag) => {
          const isDeletable = product.tags.includes(tag);
          return (
            <SChip
              key={tag._id}
              onDelete={() => {
                setProduct({
                  ...product,
                  tags: product?.tags?.filter((item) => item._id !== tag._id),
                  page: 1,
                });
              }}
              onClick={() => {
                setProduct({
                  ...product,
                  tags: [...product.tags, tag],
                  page: 1,
                });
              }}
              isDeletable={isDeletable ? true : false}
              label={tag.name}
            />
          );
        })}
    </Box>
  );
}
