import React, { Component } from 'react';
import { Button, Carousel, CarouselItem, CarouselControl,  CarouselIndicators, CarouselCaption } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookReader , faMapMarkerAlt, faUsers, faBookOpen} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import './../../index.scss';


const items = [
  {
     src: '../../../images/carousel-joaquim.jpg',
     altText: `"What an amazing app! Now I can share my books with everyone from my company"`,
    // caption: 'Slide 1'
  },
  {
    src: '../../../images/carousel-maxence.jpg',
    altText: 'Amazing!',
    // caption: 'Slide 2'
  },
  {
    src: '../../../images/carousel-mostafa.jpg',
    altText: '"Love it!"',
    // caption: 'Slide 3'
  }
];


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }



  render() { 
    
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });


    return (
      <div className="Home">
        <div className="home-header">
          <div className="SmartShelfLogo">
            <img src="../../../images/Symbol_Negative.svg" alt="logoSymbol" id="symbol"></img>
            <img src="../../../images/Logotype_Negative.svg" alt="logotype" id="logo"></img>
          </div>
          <Button href="/signup" className="button-home" border-radius="30px" block>Get Started</Button>
        </div>
        <div className="home-features">
          <div className="features features-1">
            <FontAwesomeIcon icon={faUsers} size="4x" className="icon"/>
            <h3>Create and share your own library</h3>
            <p>Make your library online and share it with your friends and colleagues. Create a wonderful community of books!</p>
          </div>
          <div className="features features-2">
            <FontAwesomeIcon icon={faBookOpen} size="4x" className="icon"/>
            <h3>Keep track of your physical books</h3>
            <p>Register your books easily and efficiently with their ISBN number and add your own review before you borrow them to your friends!</p>
          </div>
          <div className="features features-3">
            <FontAwesomeIcon icon={faBookReader} size="4x" className="icon"/>
            <h3>Find and contribute to other libraries</h3>
            <p>Search for available libraries nearby you can borrow books from... And ask to be a part of them!</p>
          </div>
          <Link to='/find-libraries'>
          <div className="home-location">
          {/* <Link to='/find-libraries'> */}
            <FontAwesomeIcon icon={faMapMarkerAlt} size="4x" className="icon"/>
            <h3>Find libraries near you</h3>
            {/* </Link>   */}
          </div>
          </Link>
        </div>
        <div className="testimonials features">
          <h2>Our Happy Smart Shelfers</h2>
          <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}>
              <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>
        </div>
      </div>
    );
  }
}
