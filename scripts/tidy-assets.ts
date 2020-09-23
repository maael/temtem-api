import glob from "glob";
import cliprogress from "cli-progress";
import throat from "throat";
import Jimp from "jimp";

console.info("Looking for files in", `${__dirname}/../public/images/`);

const MAX_DIMENSION_SIZE = 1000;

glob(
  `${__dirname}/../public/images/**/*.@(png|jpeg|jpg)`,
  async (err, files) => {
    if (err) {
      console.error("[Error]", err);
      return;
    }
    console.info(`Found ${files.length} images`);
    const prog = new cliprogress.SingleBar({
      format: "{bar} | {percentage}% | {value}/{total} | {duration_formatted}",
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
      hideCursor: true
    });
    prog.start(files.length, 0);
    const largeImages: string[] = [];
    await Promise.all(
      files.map(
        throat(15, async f => {
          const img = await Jimp.read(f);
          const height = img.getHeight();
          const width = img.getWidth();
          if (height > MAX_DIMENSION_SIZE || height > MAX_DIMENSION_SIZE) {
            largeImages.push(f);
            const args: [number, number] =
              height > width
                ? [Jimp.AUTO, MAX_DIMENSION_SIZE]
                : [MAX_DIMENSION_SIZE, Jimp.AUTO];
            await img.resize(...args).writeAsync(f);
          }
          prog.increment();
        })
      )
    );
    prog.stop();
    console.info(largeImages.length, "large images resized");
  }
);
