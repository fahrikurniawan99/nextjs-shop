import SChip from "@/components/ui/SChip";
import {
  categoryAtom,
  fetchTagAtom,
  productPageAtom,
  tagsSelectedAtom,
} from "@/stores/product";
import { Box } from "@mui/material";
import { useAtom } from "jotai";
import * as React from "react";

export default function Tags() {
  const [category] = useAtom(categoryAtom);
  const [tags, fetchTags] = useAtom(fetchTagAtom);
  const [selectedTags, setSelectedTags] = useAtom(tagsSelectedAtom);
  const [, setPage] = useAtom(productPageAtom);

  React.useEffect(() => {
    fetchTags();
  }, [category, fetchTags]);

  return (
    <Box display={"flex"} gap={1} width={"100%"} flexWrap={"wrap"}>
      {tags.map((tag: Tag) => {
        const isDeletable = selectedTags.includes(tag);
        return (
          <SChip
            key={tag._id}
            onDelete={() => {
              setSelectedTags(
                selectedTags.filter((item) => item._id !== tag._id)
              );
              setPage(1 as number);
            }}
            onClick={() => {
              setSelectedTags([...selectedTags, tag]);
              setPage(1 as number);
            }}
            isDeletable={isDeletable ? true : false}
            label={tag.name}
          />
        );
      })}
    </Box>
  );
}
