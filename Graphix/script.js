function plotGraph() {
    let equation = document.getElementById('equation').value;
    let xValues = math.range(-10, 10, 0.1).toArray();
    let yValues;
    
    try {
        yValues = xValues.map(x => math.evaluate(equation, { x: x }));
    } catch (error) {
        alert("Invalid equation! Please enter a valid mathematical function.");
        return;
    }
    
    let trace = {
        x: xValues,
        y: yValues,
        mode: 'lines',
        line: { color: '#bb86fc', width: 3 }
    };
    
    let layout = {
        paper_bgcolor: '#1e1e1e',
        plot_bgcolor: '#1e1e1e',
        font: { color: 'white' },
        margin: { t: 20, b: 40, l: 40, r: 20 },
        xaxis: { gridcolor: '#444', zerolinecolor: '#bb86fc' },
        yaxis: { gridcolor: '#444', zerolinecolor: '#bb86fc' }
    };
    
    let config = {
        displayModeBar: false
    };
    
    Plotly.newPlot('graph', [trace], layout, config);
    findZeros(equation, xValues, yValues);
}

function findZeros(equation, xValues, yValues) {
    let zeros = [];
    
    for (let i = 0; i < yValues.length - 1; i++) {
        if ((yValues[i] >= 0 && yValues[i + 1] <= 0) || (yValues[i] <= 0 && yValues[i + 1] >= 0)) {
            zeros.push(parseFloat(xValues[i].toFixed(2)));
        }
    }
    
    let solutionsList = document.getElementById('solutions-list');
    
    if (zeros.length > 0) {
        let boxesHTML = zeros.map((zero, index) => {
            let properties = getParabolaProperties(equation, zero, xValues, yValues);
            return `
                <div class="solution-box">
                    <div class="zero-value">Zero ${index + 1}: x = ${zero}</div>
                    <div class="properties">${properties}</div>
                </div>
            `;
        }).join('');
        solutionsList.innerHTML = boxesHTML;
    } else {
        solutionsList.innerHTML = '<div class="solution-box"><div class="zero-value">No zeros found</div><div class="properties">Range: [-10, 10]</div></div>';
    }
}

function getParabolaProperties(equation, zero, xValues, yValues) {
    let minY = Math.min(...yValues);
    let maxY = Math.max(...yValues);
    let minIndex = yValues.indexOf(minY);
    let vertex = `(${xValues[minIndex].toFixed(2)}, ${minY.toFixed(2)})`;
    
    let direction = yValues[0] < yValues[yValues.length - 1] ? 'Opens Up' : 'Opens Down';
    
    return `Vertex: ${vertex}<br>Direction: ${direction}<br>Y-range: [${minY.toFixed(2)}, ${maxY.toFixed(2)}]`;
}

window.onload = function() {
    document.getElementById('equation').value = 'x^2 - 5*x + 6';
    plotGraph();
    document.getElementById('equation').value = '';
};
