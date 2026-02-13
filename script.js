let currentUnit = 'in';
const sizeData = {
    XS: { bust: [31, 32], waist: [24, 25], hips: [34, 35], shoulders: 14.5, length: 25 },
    S: { bust: [33, 34], waist: [26, 27], hips: [36, 37], shoulders: 15, length: 25.5 },
    M: { bust: [35, 36], waist: [28, 29], hips: [38, 39], shoulders: 15.5, length: 26 },
    L: { bust: [37, 39], waist: [30, 32], hips: [40, 42], shoulders: 16, length: 26.5 },
    XL: { bust: [40, 42], waist: [33, 35], hips: [43, 45], shoulders: 16.5, length: 27 },
    XXL: { bust: [43, 45], waist: [36, 38], hips: [46, 48], shoulders: 17, length: 27.5 }
};

function toggleSizeChart() {
    const modal = document.getElementById('sizeChartModal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
        updateTable();
    }
}

function convertToCm(inches) {
    return Math.round(inches * 2.54);
}

function displayValue(value) {
    if (Array.isArray(value)) {
        return currentUnit === 'in' 
            ? `${value[0]}" - ${value[1]}"` 
            : `${convertToCm(value[0])} - ${convertToCm(value[1])} cm`;
    }
    return currentUnit === 'in' ? `${value}"` : `${convertToCm(value)} cm`;
}

function switchUnit(unit) {
    currentUnit = unit;
    
    document.querySelectorAll('.unit-toggle').forEach(btn => {
        if (btn.dataset.unit === unit) {
            btn.style.background = '#000';
            btn.style.color = '#FFF';
            btn.classList.add('active');
        } else {
            btn.style.background = 'transparent';
            btn.style.color = '#8B7355';
            btn.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.unit-label').forEach(label => {
        label.textContent = unit;
    });
    
    updateTable();
}

function updateTable() {
    const tbody = document.getElementById('sizeTableBody');
    tbody.innerHTML = '';
    
    Object.keys(sizeData).forEach(size => {
        const data = sizeData[size];
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid #eee';
        row.style.cursor = 'pointer';
        row.style.transition = 'background 0.25s ease';
        
        row.onmouseover = () => row.style.background = 'rgba(184, 166, 143, 0.12)';
        row.onmouseout = () => row.style.background = 'transparent';
        
        row.innerHTML = `
            <td style="padding: 20px 16px; font-weight: 500;">${size}</td>
            <td style="padding: 20px 16px; text-align: center;">${displayValue(data.bust)}</td>
            <td style="padding: 20px 16px; text-align: center;">${displayValue(data.waist)}</td>
            <td style="padding: 20px 16px; text-align: center;">${displayValue(data.hips)}</td>
            <td style="padding: 20px 16px; text-align: center;">${displayValue(data.shoulders)}</td>
            <td style="padding: 20px 16px; text-align: center;">${displayValue(data.length)}</td>
        `;
        
        tbody.appendChild(row);
    });
}

function findSize() {
    const bust = parseFloat(document.getElementById('bustInput').value);
    const waist = parseFloat(document.getElementById('waistInput').value);
    const hips = parseFloat(document.getElementById('hipsInput').value);
    
    if (isNaN(bust) && isNaN(waist) && isNaN(hips)) {
        document.getElementById('recommendedSize').style.display = 'none';
        return;
    }
    
    const bustIn = currentUnit === 'cm' ? bust / 2.54 : bust;
    const waistIn = currentUnit === 'cm' ? waist / 2.54 : waist;
    const hipsIn = currentUnit === 'cm' ? hips / 2.54 : hips;
    
    let bestMatch = null;
    let bestScore = Infinity;
    
    Object.entries(sizeData).forEach(([size, data]) => {
        let score = 0;
        let validMeasurements = 0;
        
        if (!isNaN(bustIn)) {
            const bustMid = (data.bust[0] + data.bust[1]) / 2;
            score += Math.abs(bustIn - bustMid);
            validMeasurements++;
        }
        if (!isNaN(waistIn)) {
            const waistMid = (data.waist[0] + data.waist[1]) / 2;
            score += Math.abs(waistIn - waistMid);
            validMeasurements++;
        }
        if (!isNaN(hipsIn)) {
            const hipsMid = (data.hips[0] + data.hips[1]) / 2;
            score += Math.abs(hipsIn - hipsMid);
            validMeasurements++;
        }
        
        if (validMeasurements > 0) {
            score /= validMeasurements;
            if (score < bestScore) {
                bestScore = score;
                bestMatch = size;
            }
        }
    });
    
    if (bestMatch) {
        document.getElementById('recommendedSize').style.display = 'block';
        document.getElementById('recommendedSizeValue').textContent = bestMatch;
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('sizeChartModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}