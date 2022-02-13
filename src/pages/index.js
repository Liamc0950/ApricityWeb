import * as React from "react"
import { Component } from 'react'
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import ReactModal from 'react-modal'

import Layout from "../components/layout"
import Seo from "../components/seo"

import get from 'lodash/get'

import { graphql } from 'gatsby'
import Video from "../components/video"

import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"


ReactModal.setAppElement('#___gatsby')

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
    }

      

  }
  handleModalOpen = event => {
    // console.log('handleModalOpen: ', event);
    this.setState({ isModalOpen: true })
  }

  handleModalClose = event => {
    // console.log('handleModalOpen: ', event);
    this.setState({ isModalOpen: false })
  }



  render() {

    const modalStyle = {
      content: {
        top: '20%',
        left: '25%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-25%',
        width: '60%',
        height: '80%',
        transform: 'translate(-10%, -10%)',
        background: '#D8D2C7'

      },
    };

    //Get video stories
    const stories = get(this, 'props.data.allContentfulStoryCapture.edges')

    return (
      <Layout>
        <Seo title="Home" />
        <div className="landingDiv">
          <div className="logoItem">
            <Link to="#" onClick={this.handleModalOpen}>
              <StaticImage className="centerImg" id="modalBtn"
                src="../images/Apricity_Logo_WT.png"
                width={300}
                quality={100}
                formats={["auto", "webp", "avif"]}
                alt="Stylized 'A' Logo"
              />
            </Link>
          </div>
          <div className="logoItem">
            <h1>For Ever </h1>
          </div>
        </div>
        <ReactModal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.handleModalClose}
          contentLabel="Story Capture"
          closeTimeoutMS={1000}
          style={modalStyle}
        >
          {stories.map(({ node }) => {
            return (
              <div className="container">
                <div className="item">
                    <Video
                      videoSrcURL={node.videoContent.file.url}
                      videoTitle={node.title}
                    />
                </div>
                <div className="item">
                  <h1>{node.title}</h1>
                  <h3>{node.author}</h3>
                  <p>{renderRichText(node.transcript)}</p>
                </div>
            </div>
           )
          })}
          {/* <button onClick={this.handleModalClose}>Close Modal</button> */}
        </ReactModal>
      </Layout>
    )
  }
}

export default IndexPage


export const pageQuery = graphql`
  query HomeQuery {
    allContentfulStoryCapture {
      edges {
        node {
          title
          videoContent {
            file {
              url
            }
          }
          transcript {
            raw
          }
          author
        }
      }
    }  
  }
`
