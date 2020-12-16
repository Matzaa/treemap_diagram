(function () {
    fetch(
        "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"
    )
        .then((res) => res.json())
        .then((data) => {
            makeMap(data);
            console.log("data: ", data.children);
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
            .attr("transform", (d) =>{

                return `translate(${d.x0},${d.y0})`);
            }

        block
            .append("rect")
            .attr("class", "tile")
            .attr("fill", (d) => {
                let category = d.data.category;
                if (category === "Wii") {
                    return "red";
                }
            })
            .attr("data-name", (d) => d.data.name)
            .attr("data-category", (d) => d.data.category)
            .attr("data-value", (d) => d.data.value)
    }
})();
