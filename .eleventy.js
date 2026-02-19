import path from "node:path";
import * as sass from "sass";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
    // Input directory: src
    // Output directory: _site

    eleventyConfig.addPassthroughCopy('src/img/*.svg');
    eleventyConfig.addPassthroughCopy('src/img/marken/*.*');
    eleventyConfig.addPassthroughCopy('src/fonts');
    eleventyConfig.addPassthroughCopy("src/js");

    // Swiper
    eleventyConfig.addPassthroughCopy({"node_modules/swiper": '/js/swiper'});

    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",

        // opt-out of Eleventy Layouts
        useLayouts: false,

        compile: async function (inputContent, inputPath) {
            let parsed = path.parse(inputPath);
            // Don’t compile file names that start with an underscore
            if(parsed.name.startsWith("_")) {
                return;
            }

            let result = sass.compileString(inputContent, {
                loadPaths: [
                    parsed.dir || ".",
                    this.config.dir.includes,
                ]
            });

            // Map dependencies for incremental builds
            this.addDependencies(inputPath, result.loadedUrls);

            return async (data) => {
                return result.css;
            };
        },
    });

    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addPlugin(eleventyImageTransformPlugin,  {
        formats: ["avif", "webp"],
        widths: ["480", "600", "1280"],
    });

    return {
        dir: {
            input: 'src',
            output: '_site'
        }
    }
};

