(function () {
    fetch(
        "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"
    )
        .then((res) => res.json())
        .then((data) => {
            makeMap(data);
            // // data.forEach((el)=> el["color"]=)
            // for (let i = 0; i < data.children.length; i++) {
            //     data.children[i]["color"] = colors[i];
            // }
            console.log("data: ", data);
        })
        .catch((err) => console.log("err: ", err));

    function makeMap(data) {
        let base = d3.select("#base");

        // tooltip

        const tooltip = d3
            .select("body")
            .append("div")
            .attr("id", "tooltip")
            .style("width", 100)
            .style("height", 50)
            .style("z-index", "10")
            .style("visibility", "hidden")
            .text("");

        // colors
        const colors = [
            "#63b598",
            "#ce7d78",
            "#ea9e70",
            "#a48a9e",
            "#c6e1e8",
            "#648177",
            "#0d5ac1",
            "#f205e6",
            "#1c0365",
            "#14a9ad",
            "#4ca2f9",
            "#a4e43f",
            "#d298e2",
            "#6119d0",
            "#d2737d",
            "#c0a43c",
            "#f2510e",
            "#651be6",
        ];
        // hierarchy

        let hierarchy = d3
            .hierarchy(data, (node) => {
                return node["children"];
            })
            .sum((node) => {
                return node["value"];
            })
            .sort((node1, node2) => {
                return node2["value"] - node1["value"];
            });

        console.log("hier: ", hierarchy.leaves());

        let createTree = d3.treemap().size([900, 500]);

        createTree(hierarchy);

        // map

        const block = base
            .selectAll("g")
            .data(hierarchy.leaves())
            .enter()
            .append("g")
            .attr("transform", (d) => {
                return `translate(${100 + d.x0},${50 + d.y0})`;
            });

        block
            .append("rect")
            .attr("class", "tile")
            .attr("fill", (d) => {
                let category = d.data.category;

                if (category === "2600") {
                    return colors[0];
                } else if (category === "Wii") {
                    return colors[1];
                } else if (category === "NES") {
                    return colors[2];
                } else if (category === "GB") {
                    return colors[3];
                } else if (category === "DS") {
                    return colors[4];
                } else if (category === "X360") {
                    return colors[5];
                } else if (category === "PS3") {
                    return colors[6];
                } else if (category === "PS2") {
                    return colors[7];
                } else if (category === "SNES") {
                    return colors[8];
                } else if (category === "GBA") {
                    return colors[9];
                } else if (category === "PS4") {
                    return colors[10];
                } else if (category === "3DS") {
                    return colors[11];
                } else if (category === "N64") {
                    return colors[12];
                } else if (category === "PS") {
                    return colors[13];
                } else if (category === "XB") {
                    return colors[14];
                } else if (category === "PC") {
                    return colors[15];
                } else if (category === "PSP") {
                    return colors[16];
                } else if (category === "XOne") {
                    return colors[17];
                }
            })
            .attr("stroke", "beige")

            .attr("data-name", (d) => d.data.name)
            .attr("data-category", (d) => d.data.category)
            .attr("data-value", (d) => d.data.value)
            .attr("width", (d) => {
                return d.x1 - d.x0;
            })
            .attr("height", (d) => {
                return d.y1 - d.y0;
            })
            .on("mouseover", (e, d) => {
                tooltip
                    .style("left", e.pageX - 100 + "px")
                    .style("top", e.pageY - 20 + "px")
                    .style("transform", "translateX(100px)")
                    .style("visibility", "visible")
                    .html(() => d.data.name)
                    .attr("data-value", () => d.data.value);
            })
            .on("mouseout", () => {
                tooltip.style("visibility", "hidden");
            });

        block
            .append("text")
            .text((d) => {
                return d.data.name;
            })
            .attr("x", 5)
            .attr("y", 20);
    }
})();
