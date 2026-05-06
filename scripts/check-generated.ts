import { execFileSync } from "node:child_process";

function trackedGeneratedFiles(): string[] {
  const trackedFiles = execFileSync("git", ["ls-files"], { encoding: "utf8" })
    .trim()
    .split("\n")
    .filter(Boolean);

  return trackedFiles.filter((filePath) => {
    return (
      /^packages\/js\/src\/.+\.ts$/.test(filePath) ||
      /^packages\/python\/src\/splicemood_alphabet\/.+\.py$/.test(filePath) ||
      /^[a-z0-9]+\/alphabet(?:_test)?\.go$/.test(filePath)
    );
  });
}

execFileSync("git", ["diff", "--exit-code"], { stdio: "inherit" });

const status = execFileSync("git", ["status", "--porcelain", "--untracked-files=all"], {
  encoding: "utf8",
});

const generatedFiles = trackedGeneratedFiles();

if (generatedFiles.length > 0) {
  console.error("Generated files must not be tracked:");
  console.error(generatedFiles.join("\n"));
  process.exitCode = 1;
} else if (status.trim().length > 0) {
  console.error("Working tree has uncommitted files after generation:");
  console.error(status);
  process.exitCode = 1;
} else {
  console.log("Generated files are up to date.");
}
