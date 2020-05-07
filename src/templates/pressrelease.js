import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';

const PressRelease = ({ data }) => {
  const post = data.nodePressRelease;

  return (
    <Layout>
      <h1>{post.title}</h1>
      {/* <img
        src={data.nodeArticle.relationships.field_image.localFile.publicURL}
        alt={data.nodeArticle.field_image.alt}
      /> */}
      {post.relationships.field_media.relationships?.field_media_image?.localFile &&
        <Img
          fluid={post.relationships.field_media.relationships.field_media_image.localFile.childImageSharp.fluid}
          alt={post.relationships.field_media.relationships.field_media_image.relationships.media__image[0].field_media_image.alt}
        />}

      {post.relationships.field_media.relationships?.field_media_audio_file &&
        <audio controls>
          <source src={`http://gatsbycloudpreview.lndo.site/${post.relationships.field_media.relationships?.field_media_audio_file.uri.url}`} type="audio/mpeg" />
        Your browser does not support the audio element.
        </audio>
      }

      <div
        dangerouslySetInnerHTML={{ __html: post.body.processed }}
      />
    </Layout>
  );
};

PressRelease.propTypes = {
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  query($PRId: String!) {
    nodePressRelease(id: { eq: $PRId }) {
      id
      title
      body {
        processed
      }
      relationships {
        field_media {
          ... on media__image {
            id
            name
            relationships {
              field_media_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 600) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                relationships {
                  media__image {
                    field_media_image {
                      alt
                    }
                  }
                }
              }
            }
          }
          ... on media__audio {
            id
            name
            relationships {
              field_media_audio_file {
                uri {
                  url
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default PressRelease;