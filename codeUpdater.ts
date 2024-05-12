import { parse } from "@babel/parser";
import generate from "@babel/generator";
import traverse from "@babel/traverse";
import template from "@babel/template";
import generator from "@babel/generator";
import * as t from "@babel/types";
import { readFileSync, writeFileSync } from "fs";

/**
 * Updates JavaScript code based on parsed commands.
 * @param filePath Path to the file to update.
 * @param updates Details of the updates to apply.
 */
// export const updateJavaScriptFile = (filePath: string, updates: any) => {
//   const code = readFileSync(filePath, "utf8");
//   const ast = parse(code, {
//     sourceType: "module",
//     plugins: ["jsx", "typescript"], // Ensure TypeScript support if needed
//   });

//   traverse(ast, {
//     enter(path) {
//       // Example: Insert a component or modify properties
//       if (path.isJSXElement() && path.node.openingElement.name.name === "App") {
//         // Insert a new JSX element into the App component
//         const jsxElement = t.jsxElement(
//           t.jsxOpeningElement(t.jsxIdentifier("div"), []),
//           t.jsxClosingElement(t.jsxIdentifier("div")),
//           [t.jsxText("New Element")],
//           false
//         );
//         path.node.children.push(jsxElement);
//       }
//     },
//   });

//   const output = generate(ast, {}, code);
//   writeFileSync(filePath, output.code);
// };

export const modifyPageContent = (filePath: string, newContent: string) => {
  // Read and backup the original file
  const originalCode = readFileSync(filePath, { encoding: "utf8" });
  // backupFileSync(filePath); // Assume this function creates a backup file

  // Use a Babel template to create the AST for the new content
  const astTemplate = template.ast(
    `const Page = () => (<div>${newContent}</div>); export default Page;`
  ) as t.Node;

  // Replace the content of the file
  const output = generate(astTemplate, {}, originalCode);
  writeFileSync(filePath, output.code, { encoding: "utf8" });

  console.log(`Updated ${filePath} with new content.`);
};

modifyPageContent(
  "/Users/zorbasworld/Desktop/BulBul/target-app/src/app/page.tsx",
  "Hello World!"
);
