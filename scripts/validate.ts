import fs from "fs"
import path from "path"
import { sync as globSync } from "glob"

const ID_PATTERN = /^[a-z0-9-]+-\d{3}$/

export function validateQuestionFile(
  data: unknown,
  filePath: string,
  seenIds: Set<string>
): void {
  const d = data as Record<string, unknown>

  if (!d.topic || typeof d.topic !== "string") {
    throw new Error(`${filePath}: missing or invalid 'topic' field`)
  }
  if (!d.category || typeof d.category !== "string") {
    throw new Error(`${filePath}: missing or invalid 'category' field`)
  }
  if (!Array.isArray(d.questions) || d.questions.length === 0) {
    throw new Error(`${filePath}: 'questions' must be a non-empty array`)
  }

  for (const [i, q] of (d.questions as unknown[]).entries()) {
    const question = q as Record<string, unknown>
    const loc = `${filePath} question[${i}]`

    if (!question.id || typeof question.id !== "string") {
      throw new Error(`${loc}: missing 'id'`)
    }
    if (!ID_PATTERN.test(question.id as string)) {
      throw new Error(`${loc}: id '${question.id}' must match pattern {category}-{topic}-{3-digit-number}`)
    }
    if (seenIds.has(question.id as string)) {
      throw new Error(`${loc}: duplicate id '${question.id}'`)
    }
    seenIds.add(question.id as string)

    if (!question.q || typeof question.q !== "string" || (question.q as string).trim() === "") {
      throw new Error(`${loc}: missing question text 'q'`)
    }
    if (!Array.isArray(question.options) || (question.options as unknown[]).length !== 4) {
      throw new Error(`${loc}: 'options' must have exactly 4 options`)
    }
    if (
      typeof question.answer !== "number" ||
      !Number.isInteger(question.answer) ||
      question.answer < 0 ||
      question.answer > 3
    ) {
      throw new Error(`${loc}: 'answer' must be an integer 0-3`)
    }
    if (
      !question.explanation ||
      typeof question.explanation !== "string" ||
      (question.explanation as string).trim() === ""
    ) {
      throw new Error(`${loc}: 'explanation' is required and must be non-empty`)
    }
  }
}

function main() {
  const dataDir = path.resolve(process.cwd(), "data/categories")
  const files = globSync("**/*.json", { cwd: dataDir, ignore: "**/_meta.json" })

  if (files.length === 0) {
    console.log("No question files found.")
    process.exit(0)
  }

  const seenIds = new Set<string>()
  let errors = 0

  for (const file of files) {
    const fullPath = path.join(dataDir, file)
    try {
      const raw = fs.readFileSync(fullPath, "utf-8")
      const data = JSON.parse(raw)
      validateQuestionFile(data, file, seenIds)
      console.log(`  OK  ${file} (${(data.questions as unknown[]).length} questions)`)
    } catch (err) {
      console.error(`ERROR ${err instanceof Error ? err.message : err}`)
      errors++
    }
  }

  if (errors > 0) {
    console.error(`\nValidation failed: ${errors} error(s)`)
    process.exit(1)
  }

  console.log(`\nAll ${files.length} files valid.`)
}

if (require.main === module || process.argv[1]?.endsWith("validate.ts")) {
  main()
}
