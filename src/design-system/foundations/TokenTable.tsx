import { foundation } from "./foundations.style";
import type { TTokenTableProps } from "./TokenTable.type";

/** Name, CSS variable, resolved value and description of each token, read from the build output. */
export function TokenTable({ caption, rows }: TTokenTableProps) {
  return (
    <table className={foundation.table}>
      <caption className={foundation.caption}>{caption}</caption>
      <thead>
        <tr>
          <th scope="col" className={foundation.headCell}>
            Token
          </th>
          <th scope="col" className={foundation.headCell}>
            CSS variable
          </th>
          <th scope="col" className={foundation.headCell}>
            Value
          </th>
          <th scope="col" className={foundation.headCell}>
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((token) => (
          <tr key={token.name}>
            <th scope="row" className={foundation.cellName}>
              {token.name}
            </th>
            <td className={foundation.cellCode}>{token.cssVar}</td>
            <td className={foundation.cellCode}>{token.resolved}</td>
            <td className={foundation.cell}>{token.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
