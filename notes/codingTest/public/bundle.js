/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/playground.ts":
/*!***************************!*\
  !*** ./src/playground.ts ***!
  \***************************/
/***/ (() => {

eval("\nconst graph = [\n    [],\n    [2, 3, 8],\n    [1, 7],\n    [1, 4, 5],\n    [3, 5],\n    [3, 4],\n    [7],\n    [2, 6, 8],\n    [1, 7],\n];\nconst visited = Array(graph.length).fill(false);\nfunction dfs_(g, i, v) {\n    v[i] = true;\n    console.log(i, \"방문\");\n    for (let j = 0; j < g[i].length; j++) {\n        if (!v[g[i][j]]) {\n            dfs_(g, g[i][j], v);\n        }\n    }\n}\ndfs_(graph, 1, visited);\nconst visited2 = Array(graph.length).fill(false);\nfunction bfs_(g, i, v) {\n    const queue = [];\n    queue.push(i);\n    // v[i] = true;\n    // console.log(i, \"방문\");\n    while (queue) {\n        const x = queue.shift();\n        if (!v[x]) {\n            v[x] = true;\n            console.log(x, \"방문\");\n            for (let j = 0; j < g[x].length; j++) {\n                queue.push(g[x][j]);\n            }\n        }\n    }\n}\nbfs_(graph, 1, visited2);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGxheWdyb3VuZC50cyIsIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxLQUFLLEdBQWU7SUFDeEIsRUFBRTtJQUNGLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFDSCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ1AsQ0FBQztBQUVGLE1BQU0sT0FBTyxHQUFjLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRTNELFNBQVMsSUFBSSxDQUFDLENBQWEsRUFBRSxDQUFTLEVBQUUsQ0FBWTtJQUNsRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEIsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBRUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFeEIsTUFBTSxRQUFRLEdBQWMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFNUQsU0FBUyxJQUFJLENBQUMsQ0FBYSxFQUFFLENBQVMsRUFBRSxDQUFZO0lBQ2xELE1BQU0sS0FBSyxHQUFhLEVBQUUsQ0FBQztJQUMzQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2QsZUFBZTtJQUNmLHdCQUF3QjtJQUV4QixPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2IsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBWSxDQUFDO1FBRWxDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNWLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NvZGluZ190ZXN0Ly4vc3JjL3BsYXlncm91bmQudHM/ZjU1YSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBncmFwaDogbnVtYmVyW11bXSA9IFtcbiAgW10sXG4gIFsyLCAzLCA4XSxcbiAgWzEsIDddLFxuICBbMSwgNCwgNV0sXG4gIFszLCA1XSxcbiAgWzMsIDRdLFxuICBbN10sXG4gIFsyLCA2LCA4XSxcbiAgWzEsIDddLFxuXTtcblxuY29uc3QgdmlzaXRlZDogYm9vbGVhbltdID0gQXJyYXkoZ3JhcGgubGVuZ3RoKS5maWxsKGZhbHNlKTtcblxuZnVuY3Rpb24gZGZzXyhnOiBudW1iZXJbXVtdLCBpOiBudW1iZXIsIHY6IGJvb2xlYW5bXSkge1xuICB2W2ldID0gdHJ1ZTtcbiAgY29uc29sZS5sb2coaSwgXCLrsKnrrLhcIik7XG5cbiAgZm9yIChsZXQgaiA9IDA7IGogPCBnW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgaWYgKCF2W2dbaV1bal1dKSB7XG4gICAgICBkZnNfKGcsIGdbaV1bal0sIHYpO1xuICAgIH1cbiAgfVxufVxuXG5kZnNfKGdyYXBoLCAxLCB2aXNpdGVkKTtcblxuY29uc3QgdmlzaXRlZDI6IGJvb2xlYW5bXSA9IEFycmF5KGdyYXBoLmxlbmd0aCkuZmlsbChmYWxzZSk7XG5cbmZ1bmN0aW9uIGJmc18oZzogbnVtYmVyW11bXSwgaTogbnVtYmVyLCB2OiBib29sZWFuW10pIHtcbiAgY29uc3QgcXVldWU6IG51bWJlcltdID0gW107XG4gIHF1ZXVlLnB1c2goaSk7XG4gIC8vIHZbaV0gPSB0cnVlO1xuICAvLyBjb25zb2xlLmxvZyhpLCBcIuuwqeusuFwiKTtcblxuICB3aGlsZSAocXVldWUpIHtcbiAgICBjb25zdCB4ID0gcXVldWUuc2hpZnQoKSBhcyBudW1iZXI7XG5cbiAgICBpZiAoIXZbeF0pIHtcbiAgICAgIHZbeF0gPSB0cnVlO1xuICAgICAgY29uc29sZS5sb2coeCwgXCLrsKnrrLhcIik7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdbeF0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcXVldWUucHVzaChnW3hdW2pdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuYmZzXyhncmFwaCwgMSwgdmlzaXRlZDIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/playground.ts\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/playground.ts"]();
/******/ 	
/******/ })()
;