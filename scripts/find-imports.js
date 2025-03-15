const fs = require("fs")
const path = require("path")

function findImports(dir, searchString) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)

    try {
      const stats = fs.statSync(filePath)

      if (stats.isDirectory() && file !== "node_modules" && file !== ".next") {
        findImports(filePath, searchString)
      } else if (stats.isFile() && (file.endsWith(".js") || file.endsWith(".ts") || file.endsWith(".tsx"))) {
        const content = fs.readFileSync(filePath, "utf8")
        if (content.includes(searchString)) {
          console.log(`Found in ${filePath}`)
        }
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message)
    }
  }
}

// Start the search from the current directory
findImports(process.cwd(), "ensure-content-dir")
console.log("Search complete")

