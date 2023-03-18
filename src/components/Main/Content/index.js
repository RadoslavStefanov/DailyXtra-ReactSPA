import { Container, Row, Col } from "react-bootstrap";
import PopularTopics from "../Floater/PopularTopics";
import UserPanel from "../Floater/UserPanel";

export default function MainContent(key)
{
    console.log(key.kay)
    return(
        <Container fluid className='px-5'>
          <Row>
          <Col md={3} className="border-right">
            <PopularTopics/>
          </Col>
            <Col md={6} style={{minHeight:"720px"}}>
              <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
                    est bibendum, pharetra massa vitae, consequat justo. In hac
                    habitasse platea dictumst. Etiam fermentum quam ac sapien
                    pulvinar, sit amet finibus elit viverra. In hac habitasse platea
                    dictumst. Sed lacinia semper nunc, eu pretium augue pharetra in.
                    Sed pulvinar felis vitae sem blandit, sit amet malesuada augue
                    venenatis. Sed ultricies diam id sapien congue faucibus. Sed eu
                    nunc nulla. Morbi nec metus eu velit facilisis dignissim. Nulla
                    facilisi. Sed aliquam interdum tincidunt. Vestibulum euismod,
                    magna id interdum volutpat, augue leo blandit mi, sit amet
                    volutpat velit enim nec arcu.
                  </p>
                  <p>
                    Maecenas lacinia pulvinar metus, vel facilisis risus vulputate a.
                    Suspendisse nec arcu at nisi ultricies elementum sit amet sit amet
                    enim. Donec aliquet velit ac hendrerit iaculis. Sed imperdiet
                    pharetra sapien ac consequat. Maecenas maximus leo ut est
                    facilisis, id consequat magna laoreet. Aliquam fermentum malesuada
                    justo, vel pulvinar tortor dign 
                  </p>
                  <p>
                    Duis sed ex massa. Morbi faucibus, massa non ullamcorper
                    ullamcorper, felis risus auctor libero, in finibus ipsum justo
                    non nisl. Curabitur sed congue neque. Sed id felis auctor,
                    consectetur quam ac, interdum ipsum. Nullam hendrerit est vel
                    nulla laoreet, vitae tincidunt lorem dapibus. Sed at pharetra
                    velit. Morbi fringilla quam ac tellus eleifend, eu vestibulum
                    neque dictum. Nullam euismod augue quis odio pretium viverra.
                    Fusce a odio sapien. Donec et elit elit. Duis eu tortor velit. Sed
                    in quam in arcu euismod pretium. Suspendisse convallis commodo
                    sem, vel consectetur justo varius nec. Donec at ligula a elit
                    pellentesque vulputate sed a nisl. Sed eget diam vitae diam
                    placerat commodo eget ut dolor. Phasellus commodo malesuada enim,
                    non vulputate turpis lobortis eu.
                  </p>
                </div>
            </Col>
            <Col md={3} className="position-sticky">
              <UserPanel/>
            </Col>
          </Row>
        </Container>
    )
}