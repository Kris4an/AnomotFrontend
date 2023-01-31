import DOMPurify from "dompurify";

const regex = new RegExp("^(" + process.env.NEXT_PUBLIC_URL_REGEX! + ")$", "i");

const hook = (node: Element, data: DOMPurify.HookEvent, config: DOMPurify.Config) => {
    if (node.tagName.toLowerCase() == "a") {
        for (let i = 0; i < node.attributes.length; i++) {
            const attr = node.attributes[i]
            if (attr.name.toLowerCase() === "href") {
                if (!regex.test(attr.value)) {
                    node.removeAttribute(attr.name)
                }
            }
            if (attr.name.toLowerCase() === "target") {
                if (attr.value !== "_blank") {
                    node.removeAttribute(attr.name)
                }
            }
            if (attr.name.toLowerCase() === "rel") {
                if (attr.value !== "noopener noreferrer nofollow") {
                    node.removeAttribute(attr.name)
                }
            }
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