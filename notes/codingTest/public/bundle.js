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

/***/ "./src/binary_search.ts":
/*!******************************!*\
  !*** ./src/binary_search.ts ***!
  \******************************/
/***/ (() => {

eval("\nconst _arr = [1, 3, 5, 6, 9, 11, 13, 15, 17, 19];\nfunction binarySearchRecur(array, target, start, end) {\n    if (start > end)\n        return -1;\n    const mid = Math.floor((start + end) / 2);\n    if (target === array[mid])\n        return mid;\n    if (target < array[mid]) {\n        return binarySearchRecur(array, target, start, mid - 1);\n    }\n    else {\n        return binarySearchRecur(array, target, mid + 1, end);\n    }\n}\nconsole.time(\"binarySearchRecur\");\nconsole.log(binarySearchRecur(_arr, 6, 0, _arr.length - 1));\nconsole.timeEnd(\"binarySearchRecur\");\nfunction binarySearchLoop(array, target, start, end) {\n    while (start <= end) {\n        const mid = Math.floor((start + end) / 2);\n        if (target === array[mid])\n            return mid;\n        if (array[mid] > target) {\n            end = mid - 1;\n        }\n        else {\n            start = mid + 1;\n        }\n    }\n    return -1;\n}\nconsole.time(\"binarySearchLoop\");\nconsole.log(binarySearchLoop(_arr, 6, 0, _arr.length - 1));\nconsole.timeEnd(\"binarySearchLoop\");\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmluYXJ5X3NlYXJjaC50cyIsIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUVqRCxTQUFTLGlCQUFpQixDQUN4QixLQUFlLEVBQ2YsTUFBYyxFQUNkLEtBQWEsRUFDYixHQUFXO0lBRVgsSUFBSSxLQUFLLEdBQUcsR0FBRztRQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDM0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUUxQyxJQUFJLE1BQU0sS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQUUsT0FBTyxHQUFHLENBQUM7SUFFdEMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDeEIsT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLGlCQUFpQixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN4RCxDQUFDO0FBQ0gsQ0FBQztBQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1RCxPQUFPLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFckMsU0FBUyxnQkFBZ0IsQ0FDdkIsS0FBZSxFQUNmLE1BQWMsRUFDZCxLQUFhLEVBQ2IsR0FBVztJQUVYLE9BQU8sS0FBSyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxNQUFNLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sR0FBRyxDQUFDO1FBRXRDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDO1lBQ3hCLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLENBQUM7YUFBTSxDQUFDO1lBQ04sS0FBSyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDbEIsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ1osQ0FBQztBQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzRCxPQUFPLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb2RpbmdfdGVzdC8uL3NyYy9iaW5hcnlfc2VhcmNoLnRzPzIzMmEiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgX2FyciA9IFsxLCAzLCA1LCA2LCA5LCAxMSwgMTMsIDE1LCAxNywgMTldO1xuXG5mdW5jdGlvbiBiaW5hcnlTZWFyY2hSZWN1cihcbiAgYXJyYXk6IG51bWJlcltdLFxuICB0YXJnZXQ6IG51bWJlcixcbiAgc3RhcnQ6IG51bWJlcixcbiAgZW5kOiBudW1iZXJcbikge1xuICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiAtMTtcbiAgY29uc3QgbWlkID0gTWF0aC5mbG9vcigoc3RhcnQgKyBlbmQpIC8gMik7XG5cbiAgaWYgKHRhcmdldCA9PT0gYXJyYXlbbWlkXSkgcmV0dXJuIG1pZDtcblxuICBpZiAodGFyZ2V0IDwgYXJyYXlbbWlkXSkge1xuICAgIHJldHVybiBiaW5hcnlTZWFyY2hSZWN1cihhcnJheSwgdGFyZ2V0LCBzdGFydCwgbWlkIC0gMSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJpbmFyeVNlYXJjaFJlY3VyKGFycmF5LCB0YXJnZXQsIG1pZCArIDEsIGVuZCk7XG4gIH1cbn1cblxuY29uc29sZS50aW1lKFwiYmluYXJ5U2VhcmNoUmVjdXJcIik7XG5jb25zb2xlLmxvZyhiaW5hcnlTZWFyY2hSZWN1cihfYXJyLCA2LCAwLCBfYXJyLmxlbmd0aCAtIDEpKTtcbmNvbnNvbGUudGltZUVuZChcImJpbmFyeVNlYXJjaFJlY3VyXCIpO1xuXG5mdW5jdGlvbiBiaW5hcnlTZWFyY2hMb29wKFxuICBhcnJheTogbnVtYmVyW10sXG4gIHRhcmdldDogbnVtYmVyLFxuICBzdGFydDogbnVtYmVyLFxuICBlbmQ6IG51bWJlclxuKSB7XG4gIHdoaWxlIChzdGFydCA8PSBlbmQpIHtcbiAgICBjb25zdCBtaWQgPSBNYXRoLmZsb29yKChzdGFydCArIGVuZCkgLyAyKTtcbiAgICBpZiAodGFyZ2V0ID09PSBhcnJheVttaWRdKSByZXR1cm4gbWlkO1xuXG4gICAgaWYgKGFycmF5W21pZF0gPiB0YXJnZXQpIHtcbiAgICAgIGVuZCA9IG1pZCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0ID0gbWlkICsgMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5jb25zb2xlLnRpbWUoXCJiaW5hcnlTZWFyY2hMb29wXCIpO1xuY29uc29sZS5sb2coYmluYXJ5U2VhcmNoTG9vcChfYXJyLCA2LCAwLCBfYXJyLmxlbmd0aCAtIDEpKTtcbmNvbnNvbGUudGltZUVuZChcImJpbmFyeVNlYXJjaExvb3BcIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/binary_search.ts\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/binary_search.ts"]();
/******/ 	
/******/ })()
;