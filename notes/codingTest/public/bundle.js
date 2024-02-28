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

/***/ "./src/implementation.ts":
/*!*******************************!*\
  !*** ./src/implementation.ts ***!
  \*******************************/
/***/ (() => {

eval("\nconst maxN = 5;\nconst directions = [\"R\", \"R\", \"R\", \"U\", \"D\", \"D\"];\nfunction moving(n, list) {\n    console.time(\"moving\");\n    const position = [1, 1];\n    for (let i = 0; i < list.length; i++) {\n        switch (list[i]) {\n            case \"L\": {\n                if (position[1] > 1) {\n                    position[1]--;\n                }\n                break;\n            }\n            case \"R\": {\n                if (position[1] < n) {\n                    position[1]++;\n                }\n                break;\n            }\n            case \"U\": {\n                if (position[0] > 1) {\n                    position[0]--;\n                }\n                break;\n            }\n            case \"D\": {\n                if (position[0] < n) {\n                    position[0]++;\n                }\n                break;\n            }\n            default:\n                break;\n        }\n    }\n    const result = position.join(\" \");\n    console.timeEnd(\"moving\");\n    return result;\n}\nconsole.log(moving(maxN, directions));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW1wbGVtZW50YXRpb24udHMiLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQztBQUNmLE1BQU0sVUFBVSxHQUFnQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFFL0QsU0FBUyxNQUFNLENBQUMsQ0FBUyxFQUFFLElBQWlCO0lBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNyQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2hCLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDVCxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDcEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0QsTUFBTTtZQUNSLENBQUM7WUFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ3BCLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNoQixDQUFDO2dCQUNELE1BQU07WUFDUixDQUFDO1lBQ0QsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNULElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNwQixRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztnQkFDRCxNQUFNO1lBQ1IsQ0FBQztZQUNELEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDVCxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDcEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0QsTUFBTTtZQUNSLENBQUM7WUFDRDtnQkFDRSxNQUFNO1FBQ1YsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUIsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29kaW5nX3Rlc3QvLi9zcmMvaW1wbGVtZW50YXRpb24udHM/NzY4NCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyDsg4HtlZjsoozsmrBcbnR5cGUgRGlyZWN0aW9uID0gXCJSXCIgfCBcIkxcIiB8IFwiVVwiIHwgXCJEXCI7XG5jb25zdCBtYXhOID0gNTtcbmNvbnN0IGRpcmVjdGlvbnM6IERpcmVjdGlvbltdID0gW1wiUlwiLCBcIlJcIiwgXCJSXCIsIFwiVVwiLCBcIkRcIiwgXCJEXCJdO1xuXG5mdW5jdGlvbiBtb3ZpbmcobjogbnVtYmVyLCBsaXN0OiBEaXJlY3Rpb25bXSkge1xuICBjb25zb2xlLnRpbWUoXCJtb3ZpbmdcIik7XG4gIGNvbnN0IHBvc2l0aW9uID0gWzEsIDFdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBzd2l0Y2ggKGxpc3RbaV0pIHtcbiAgICAgIGNhc2UgXCJMXCI6IHtcbiAgICAgICAgaWYgKHBvc2l0aW9uWzFdID4gMSkge1xuICAgICAgICAgIHBvc2l0aW9uWzFdLS07XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiUlwiOiB7XG4gICAgICAgIGlmIChwb3NpdGlvblsxXSA8IG4pIHtcbiAgICAgICAgICBwb3NpdGlvblsxXSsrO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcIlVcIjoge1xuICAgICAgICBpZiAocG9zaXRpb25bMF0gPiAxKSB7XG4gICAgICAgICAgcG9zaXRpb25bMF0tLTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJEXCI6IHtcbiAgICAgICAgaWYgKHBvc2l0aW9uWzBdIDwgbikge1xuICAgICAgICAgIHBvc2l0aW9uWzBdKys7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgY29uc3QgcmVzdWx0ID0gcG9zaXRpb24uam9pbihcIiBcIik7XG4gIGNvbnNvbGUudGltZUVuZChcIm1vdmluZ1wiKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuY29uc29sZS5sb2cobW92aW5nKG1heE4sIGRpcmVjdGlvbnMpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/implementation.ts\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/implementation.ts"]();
/******/ 	
/******/ })()
;