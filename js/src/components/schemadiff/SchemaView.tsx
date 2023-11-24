import { useMemo } from "react";
import { NodeColumnData } from "../lineagediff/lineagediff";
import { mergeColumns, toDataGrid } from "./schemadiff";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";

interface SchemaViewProps {
  base?: { [key: string]: NodeColumnData };
  current?: { [key: string]: NodeColumnData };
}

export function SchemaView({ base, current }: SchemaViewProps) {
  const { columns, rows } = useMemo(
    () => toDataGrid(mergeColumns(base, current)),
    [base, current]
  );

  return (
    <DataGrid
      style={{
        height: "100%",

        fontSize: "10pt",
        borderWidth: 1,
        overflowY: "auto",
      }}
      columns={columns}
      rows={rows}
      className="fill-grid"
    ></DataGrid>
  );

  //   return (
  //     <List>
  //       {Object.entries(merged).map(([name, column]) => {
  //         return <ListItem>{name}</ListItem>;
  //       })}
  //     </List>
  //   );
}