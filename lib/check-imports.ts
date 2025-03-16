// This is a temporary file to help debug import issues
// You can delete this file after resolving the import error

import fs from "fs"
import path from "path"

function checkForImport(directory: string, searchString: string) {
  const files = fs.readdirSync(directory)

  for (const file of files) {
    const filePath = path.join(directory, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      checkForImport(filePath, searchString)
    } else if (stats.isFile() && (file.endsWith(".ts") || file.endsWith(".tsx"))) {
      const content = fs.readFileSync(filePath, "utf8")
      if (content.includes(searchString)) {
        console.log(`Found import in: ${filePath}`)
      }
    }
  }
}

// Check for imports of ensure-content-dir
const rootDir = path.join(process.cwd())
checkForImport(rootDir, "ensure-content-dir")

console.log("Import check complete")

