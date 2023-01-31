import DOMPurify from "dompurify";

const regex = new RegExp("^(" + process.env.NEXT_PUBLIC_URL_REGEX! + ")$", "i");

const hook = (node: Element, data: DOMPurify.HookEvent, config: DOMPurify.Config) => {
    if (node.tagName.toLowerCase() == "a") {
        const href = node.getAttribute("href")
        const target = node.getAttribute("target")
        const rel = node.getAttribute("rel")

        // Remove any invalid values
        if (href !== null && !regex.test(href)) {
            node.removeAttribute("href")
        }
        if (target !== null && target !== "_blank") {
            node.removeAttribute("target")
        }

        if (rel !== null && rel !== "noopener noreferrer nofollow") {
            node.removeAttribute("rel")
        }

        // Set target and rel if they are null
        // The href doesn't matter, since if it's not set, the <a> tag will display as normal non-clickable text
        if (node.getAttribute("target") === null) {
            node.setAttribute("target", "_blank")
        }

        if (node.getAttribute("rel") === null) {
            node.setAttribute("rel", "noopener noreferrer nofollow")
        }
    } else {
        node.removeAttribute("href")
        node.removeAttribute("target")
        node.removeAttribute("rel")
    }
}

const config = {
    ALLOWED_TAGS: ["p", "strong", "em", "u", "s", "ul", "li", "ol", "sup", "sub", "a", "blockquote", "code", "pre"],
    ALLOWED_ATTR: ["href", "target", "rel"],
    ALLOWED_URI_REGEX: regex
}

const sanitizeHtml = (html: string) => {
    DOMPurify.addHook(
        'afterSanitizeAttributes',
        hook
    );

    DOMPurify.setConfig(config);

    return DOMPurify.sanitize(html)
};

export { sanitizeHtml };