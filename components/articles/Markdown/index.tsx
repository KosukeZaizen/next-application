import React, { CSSProperties, ReactChildren } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { css } from "../../../lib/css";
import { CodeRender } from "./CodeRender";
import { HeadingRenderer } from "./HeadingRenderer";
import { ImageRender } from "./ImageRender";
import styles from "./index.module.css";
import { InlineCodeRender } from "./InlineCodeRender";
import { LinkRender, LinkWithoutShadowRender } from "./LinkBlockRender";
import { TableCellRender } from "./Table/TableCellRender";

interface MarkdownProps {
    source: string;
    style?: CSSProperties;
    section?: boolean;
    noLinkShadow?: boolean;
}
export function Markdown({
    source,
    style,
    section,
    noLinkShadow,
}: MarkdownProps) {
    const markdown = (
        <ReactMarkdown
            source={source}
            renderers={{
                link: noLinkShadow ? LinkWithoutShadowRender : LinkRender,
                heading: HeadingRenderer,
                image: ImageRender,
                code: CodeRender,
                inlineCode: InlineCodeRender,
                paragraph: ParagraphRender,
                tableCell: TableCellRender,
            }}
            plugins={[gfm]}
        />
    );

    return section ? (
        <section style={style} className={styles.markdownArea}>
            {markdown}
        </section>
    ) : (
        <div style={style} className={styles.markdownArea}>
            {markdown}
        </div>
    );
}

function ParagraphRender({ children }: { children: ReactChildren }) {
    return <span css={paragraphStyle}>{children}</span>;
}

const paragraphStyle = css({
    display: "block",
    marginBottom: 15,
});
