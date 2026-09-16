"use client";

import React, { useMemo } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import RevealSlideAndFade from "../RevealSlideAndFade";
import BlockMoreNewsCard from "./BlockMoreNewsCard";
/* import BlockMoreNewsCard from "./BlockMoreNewsCard"; */

const NewsTemplateBody = ({
  contentHtml, // HTML convertido do markdown/mdx
  data, // textos do i18n (share, more etc)
  slug, // slug do post atual
  locale, // "pt", "en", etc
  prev,
  next, // próximo post
  mobile,
}) => {
  // Faz os ajustes de classes no HTML gerado
  const htmlToReturn = useMemo(() => {
    if (!contentHtml) return "";

    let html = contentHtml;

    // Ajuste simples para headings e parágrafos (opcional)
    html = html.replaceAll("<h1>", '<h1 class="KSemiBold fs-2 black">');
    html = html.replaceAll("<h2>", '<h2 class="KSemiBold fs-3 black">');
    html = html.replaceAll("<h3>", '<h3 class="KSemiBold fs-4 black">');

    html = html.replaceAll(
      "<p>",
      '<p class="KRegular paragraph fs-5 black w-100">'
    );

    html = html.replaceAll(
      "<ul>",
      '<ul class="KRegular paragraph fs-5 black w-100">'
    );
    html = html.replaceAll(
      "<ol>",
      '<ol class="KRegular paragraph fs-5 black w-100">'
    );
    html = html.replaceAll(
      "<li>",
      '<li class="KRegular paragraph fs-5 black w-100">'
    );

    html = html.replaceAll(
      "<blockquote>",
      '<blockquote class="KRegular paragraph fs-5 black w-100">'
    );

    // Imagens responsivas
    html = html.replaceAll("<img ", '<img class="w-100 img-news" ');

    // Iframes responsivos
    html = html.replaceAll(
      "<iframe",
      '<div class="container-video-news"><iframe'
    );
    html = html.replaceAll("</iframe>", "</iframe></div>");

    return html;
  }, [contentHtml]);

  const fullUrl = `https://pontourbano.pt/${locale}/noticias/${slug}`;

  return (
    <div className="container-news-template-body margin-container">
      <Row>
        <Col sm="1" md="1" lg="1"></Col>

        <Col sm="10" md="10" lg="10">
          <RevealSlideAndFade cascade={true} damping={0.3}>
            <div className="pt-7">
              <hr />
              <div
                className="mt-7 container-body-inner"
                dangerouslySetInnerHTML={{ __html: htmlToReturn }}
              />
            </div>

            {/* SHARE */}
            <div className="pt-7">
              <hr />
              <div className="container-share-buttons-main">
                <p className="fs-6 black KRegular mt-3 mb-3">
                  {data.share.text}
                </p>

                <div
                  className={
                    mobile
                      ? "container-share-buttons mb-3"
                      : "container-share-buttons ms-3"
                  }
                >
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={data.share.facebookIcon}
                      alt={data.share.facebookIconAlt}
                      title={data.share.facebookIconAlt}
                      className="icon-shared-icons"
                    />
                  </a>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${fullUrl}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={data.share.linkedinIcon}
                      alt={data.share.linkedinIconAlt}
                      title={data.share.linkedinIconAlt}
                      className="icon-shared-icons"
                    />
                  </a>

                  <a
                    href={`https://api.whatsapp.com/send/?text=${fullUrl}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={data.share.whatsappIcon}
                      alt={data.share.whatsappIconAlt}
                      title={data.share.whatsappIconAlt}
                      className="icon-shared-icons"
                    />
                  </a>
                </div>
              </div>
              <hr />
            </div>

            {/* MORE NEWS */}
            <div className={mobile ? "" : "pt-7"}>
              <div className="container-more-news">
                <h3
                  className={
                    mobile
                      ? "fs-4 black KSemiBold mt-3 mb-3"
                      : "fs-3 black KSemiBold mt-5 mb-5"
                  }
                >
                  {data.more.text}
                </h3>

                <Row>
                  <Col sm="12" md="6" lg="6">
                    {prev && (
                      <BlockMoreNewsCard
                        data={prev}
                        button={data.more.button}
                        locale={locale}
                      />
                    )}
                  </Col>

                  <Col sm="12" md="6" lg="6">
                    {next && (
                      <BlockMoreNewsCard
                        data={next}
                        button={data.more.button}
                        locale={locale}
                      />
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </RevealSlideAndFade>
        </Col>

        <Col sm="1" md="1" lg="1"></Col>
      </Row>
    </div>
  );
};

export default NewsTemplateBody;
