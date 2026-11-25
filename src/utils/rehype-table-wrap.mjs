function text(node) {
	if (node.type === "text") return node.value;
	return (node.children ?? []).map(text).join("");
}

/** "Table: Milestone, Outcome, Due" from the header row, so the scroll region has a useful name. */
function tableLabel(table) {
	const headers = [];
	const collect = (node) => {
		if (node.type === "element" && node.tagName === "th") headers.push(text(node).trim());
		else for (const child of node.children ?? []) collect(child);
	};
	collect(table);
	const named = headers.filter(Boolean);
	return named.length ? `Table: ${named.join(", ")}` : "Table";
}

function wrapTables(node) {
	if (!node.children) return;
	node.children = node.children.map((child) => {
		if (child.type === "element" && child.tagName === "table") {
			// Focusable region: keyboard users can scroll a table that is wider than a phone screen.
			return {
				type: "element",
				tagName: "div",
				properties: {
					className: ["table-wrap"],
					role: "region",
					tabIndex: 0,
					ariaLabel: tableLabel(child),
				},
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
