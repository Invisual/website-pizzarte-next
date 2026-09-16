import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GeneralButton from "../buttons/GeneralButton";
import { checkMonth } from "../../utils/functions";
import Link from "next/link";
import Image from "next/image";

const BlockMoreNewsCard = ({ data, locale, button }) => {
  // 'data' é o objeto completo do post anterior/próximo com 'pt' e 'en'
  // 'lng' é a linguagem atual

  // Acessar o post correto com base na linguagem
  const postData = data;
  // console.log(data)

  if (!postData) {
    // Se não houver dados para a linguagem atual, não renderizar o card
    return null;
  }

  /* var monthToDisplayAux = postData.date.split("|");
  var monthToDisplay = checkMonth(lng, parseInt(monthToDisplayAux[1])); */
  var monthToDisplayAux = data.frontmatter.date.split("-");
  var monthToDisplay = checkMonth(locale, parseInt(monthToDisplayAux[1]));
  // Use a URI do objeto de dados do post
  // Use a URI do objeto de dados do post
  const linkTo =
    locale === "pt"
      ? `/noticias/${data.frontmatter.slug}`
      : `/en/news/${data.frontmatter.slug}`;

  return (
    <Row className="container-block-news-card">
      <Col sm="5" md="5" lg="5">
        <Link href={linkTo} target="_self">
          <Image
            src={data.frontmatter.image}
            alt={data.frontmatter.title}
            fill={true}
            className="img-more-news"
            title={data.frontmatter.title}
          />
        </Link>
      </Col>
      <Col sm="7" md="7" lg="7" className="m-auto container-info">
        <p className="black fs-5 KLight">
          {monthToDisplay + " | " + monthToDisplayAux[2]}
        </p>
        <p className="black fs-5 KMedium">{data.frontmatter.title}</p>
        <GeneralButton text={button.text} />
      </Col>
    </Row>
  );
};

export default BlockMoreNewsCard;
