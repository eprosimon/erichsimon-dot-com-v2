const fs = require("fs")
const path = require("path")

function findImports(dir, searchString, ignoreDirs = ["node_modules", ".next", ".git", "dist", "build"]) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)

    try {
      const stats = fs.statSync(filePath)

      if (stats.isDirectory() && !ignoreDirs.includes(file)) {
        findImports(filePath, searchString)
      } else if (stats.isFile() && (file.endsWith(".js") || file.endsWith(".ts") || file.endsWith(".tsx"))) {
        const content = fs.readFileSync(filePath, "utf8")
        // More precise search using regex to find actual imports
        const importRegex = new RegExp(`(import|require).*['"].*${searchString}.*['"]`, 'g')
        if (importRegex.test(content)) {
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

