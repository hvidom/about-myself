function wrapTables(node) {
	if (!node.children) return;
	node.children = node.children.map((child) => {
		if (child.type === "element" && child.tagName === "table") {
			return {
				type: "element",
				tagName: "div",
				properties: { className: ["table-wrap"] },
				children: [child],
			};
		}
		wrapTables(child);
		return child;
	});
}

export function rehypeTableWrap() {
	return (tree) => wrapTables(tree);
}
