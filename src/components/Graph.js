import { useEffect } from 'react'; // Importer useEffect depuis React

function DiagramBar(data) {
    function createTextElement(x, y, fill, fontSize, fontFamily, textContent) {
        return createSvgElement("text", { x, y, fill, "font-size": fontSize, "font-family": fontFamily, "textContent":textContent });
    }

    function hide() {
        const tt = document.getElementById('tt');
        if (tt) {
            tt.style.visibility = 'hidden';
        }
    }
    function show(text, event) {
        let tt = document.getElementById('tt');
        if (!tt) {
            tt = document.createElement('div');
            tt.id = 'tt';
    
            document.body.appendChild(tt);
        }
        tt.textContent = text;
    
        const w = tt.offsetWidth;
        const h = tt.offsetHeight;
    
        const left = event.clientX + 15 < window.innerWidth - w
            ? event.clientX + 15
            : window.innerWidth - w - 15;
    
        const top = event.clientY - h > 0
            ? event.clientY - h
            : event.clientY + 15;
    
        tt.style.left = `${left}px`;
        tt.style.top = `${top}px`;
        tt.style.visibility = 'visible';
    }
    function createRectElement(x, y, width, height, stroke, className) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x.toString());
        rect.setAttribute("y", y.toString());
        rect.setAttribute("width", width.toString());
        rect.setAttribute("height", height.toString());
        rect.setAttribute("stroke", stroke);
        if (className) {
            rect.setAttribute("class", className);
        }
        return rect;
    }

    function createLineElement(x1, y1, x2, y2, stroke) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1.toString());
        line.setAttribute("y1", y1.toString());
        line.setAttribute("x2", x2.toString());
        line.setAttribute("y2", y2.toString());
        line.setAttribute("stroke", stroke);
        return line;
    }

    function createPathElement(d, fill, mouseoverCallback, mouseoutCallback) {
        const path = createSvgElement("path", { d, fill });
    
        path.addEventListener("mouseover", mouseoverCallback);
        path.addEventListener("mouseout", mouseoutCallback);
    
        return path;
    }

    function createSvgElement(type, attributes) {
        const svgNS = "http://www.w3.org/2000/svg";
        const element = document.createElementNS(svgNS, type);
    
        for (const key in attributes) {
            if(key=="textContent"){
              element.textContent=attributes[key]  
            }
            element.setAttribute(key, attributes[key]);
        }
    
        return element;
    }

    useEffect(() => {
        const svg = document.getElementById('xp');
        const svgHeight = 200;
        const barWidth = 10;
        const xOffset = 20;
        const barGap = 5;
        const xp_max = Math.max(...data.map(item => item.xp));
        const yAxisLength = svgHeight + 10;
        const xAxisLength = data.length * (barWidth + barGap) + 50;

        // Dessiner le texte "Projects Done"
        svg.appendChild(createTextElement(320, 20, "white", "30px", "Arial, sans-serif", "Projects Done"));

        // Dessiner l'axe Y
        svg.appendChild(createTextElement(30, 30, "white", "30px", "Arial, sans-serif", "XP"));
        svg.appendChild(createLineElement(xOffset, 5, xOffset, yAxisLength, "white"));

        // Dessiner l'axe X
        svg.appendChild(createTextElement(350, 250, "white", "30px", "Arial, sans-serif", "Projects"));
        svg.appendChild(createLineElement(xOffset, yAxisLength, xAxisLength, yAxisLength, "white"));

        data.forEach((item, index) => {
            const barHeight = (item.xp / xp_max) * svgHeight;
            const bar = createRectElement(20 + (barWidth + barGap) * index, 10 + svgHeight - barHeight, barWidth, barHeight, "white", "barre");

            // Ajouter un événement de survol pour afficher une infobulle
            bar.addEventListener("mouseover", () => show(`${item.name} - ${item.xp} XP`,event));
            bar.addEventListener("mouseout", ()=>hide());

            svg.appendChild(bar);
        });
    }, [data]); // Utiliser les dépendances pour s'assurer que useEffect s'exécute lors des changements de données
}

export default DiagramBar;
