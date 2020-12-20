(function () {
    fetch(
        "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"
    )
        .then((res) => res.json())
        .then((data) => {
            makeMap(data);
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
            ["#63b598", "2600"],
            ["#ce7d78", "Wii"],
            ["#ea9e70", "NES"],
            ["#a48a9e", "GB"],
            ["#c6e1e8", "DS"],
            ["#648177", "X360"],
            ["#0d5ac1", "PS3"],
            ["#f205e6", "PS2"],
            ["#1c0365", "SNES"],
            ["#14a9ad", "GBA"],
            ["#4ca2f9", "PS4"],
            ["#a4e43f", "3DS"],
            ["#d298e2", "N64"],
            ["#6119d0", "PS"],
            ["#d2737d", "XB"],
            ["#c0a43c", "PC"],
            ["#f2510e", "PSP"],
            ["#651be6", "XOne"],
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
                for (let i = 0; i < colors.length; i++) {
                    if (category === colors[i][1]) {
                        return colors[i][0];
                    }
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
