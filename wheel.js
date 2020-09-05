var padding = { top: 20, right: 40, bottom: 0, left: 0 },
    w = 500 - padding.left - padding.right,
    h = 500 - padding.top - padding.bottom,
    r = Math.min(w, h) / 2,
    rotation = 0,
    oldRotation = 0,
    picked = 100000,
    oldPick = [],
    color = d3.scale.category20();

//Restaurant Names   
var data = [
    { "label": "Dim Sum House" },
    { "label": "Thanal" },
    { "label": "Rice Cakes/Peanut Butter" },
    { "label": "Tofu" },
    { "label": "White Dog Cafe" },
    { "label": "Allegro\'s" },
    { "label": "Copabanana" },
    { "label": "Erawan" },
    { "label": "Max Brenner" },
    { "label": "Crepes" },
    { "label": "Subway" },
    { "label": "Cereal" },
    { "label": "Mushroom Risoto" },
    { "label": "Dim Sum Garden" },
    { "label": "Chsck Factory" },
    { "label": "\&Pizza" },
    { "label": "4060 Chestnut Pizza" },
    { "label": "Just Salad" },
    { "label": "Franklin\'s Table" },
    { "label": "Pasta at Home" },
    { "label": "Ochatto" },
    { "label": "Han Dynasty" },
    { "label": "Pattaya" },
    { "label": "El Vez" },
    { "label": "Bonchon" },
    { "label": "Spread Bagelry" },
    { "label": "Chipotle" },
    { "label": "QDOBA" },
    { "label": "Food Truck" },

];
var svg = d3.select('#chart')
    .append("svg")
    .data([data])
    .attr("width", w + padding.left + padding.right)
    .attr("height", h + padding.top + padding.bottom);
var container = svg.append("g")
    .attr("class", "chartholder")
    .attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")");
var vis = container
    .append("g");

var pie = d3.layout.pie().sort(null).value(function (d) { return 1; });
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);
// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice");

arcs.append("path")
    .attr("fill", function (d, i) { return color(i); })
    .attr("d", function (d) { return arc(d); });
// add the text
arcs.append("text").style({ "font-weight": "bold", "font-size": "12px" }).attr("transform", function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
})
    .attr("text-anchor", "end")
    .text(function (d, i) {
        return data[i].label;
    });
container.on("click", spin);
function spin(d) {

    container.on("click", null);
    
    var ps = 360 / data.length,
        rng = Math.floor((Math.random() * 1440) + 360);

    rotation = (Math.round(rng / ps) * ps);

    rotation += 90 - Math.round(ps / 2);
    vis.transition()
        .duration(3000)
        .attrTween("transform", rotTween)
        .each("end", function () {
            oldRotation = rotation;
            container.on("click", spin);
        });
}
//make arrow
svg.append("g")
    .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h / 2) + padding.top) + ")")
    .append("path")
    .attr("d", "M-" + (r * .15) + ",0L0," + (r * .05) + "L0,-" + (r * .05) + "Z")
    .style({ "fill": "black" });
//draw spin circle
container.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 60)
    .style({ "fill": "white", "cursor": "pointer" });
//spin text
container.append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .text("Where To")
    .style({ "font-weight": "bold", "font-size": "25px",});
    container.append("text")
    .attr("x", 0)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .text("Eat?")
    .style({ "font-weight": "bold", "font-size": "25px",});


function rotTween(to) {
    var i = d3.interpolate(oldRotation % 360, rotation);
    return function (t) {
        return "rotate(" + i(t) + ")";
    };
}
