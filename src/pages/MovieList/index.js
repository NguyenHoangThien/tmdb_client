import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Page from 'components/Page/Page';
import { Card, Row, Col } from 'antd';
import { getLists } from './actions';

const imagePrefix = 'https://www.themoviedb.org/t/p/w220_and_h330_face/';
const mapDispatchToProps = {
  getListsAction: getLists
};

const MovieList = ({
  getListsAction
}) => {
  const [listMovie, setListMovie] = useState([]);

  useEffect(() => {
    const fetchListMovie = async () => {
      const listMovies = await getListsAction();
      setListMovie(listMovies);
    }
    fetchListMovie();
  });

  return (
    <Page helmet="Latest & Popular Movie">
      <section style={{
        minHeight: '300px',
        height: 'calc(100vh / 2.5)',
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
        marginBottom: 10,
        backgroundImage: 'url("https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/hPea3Qy5Gd6z4kJLUruBbwAH8Rm.jpg")'
      }}>
      </section>
      <h2> What's Latest & Popular </h2>
      <Row gutter={[16, 16]}>
        {
          listMovie.map(({
            adult,
            backdrop_path,
            genre_ids,
            id,
            original_language,
            original_title,
            overview,
            popularity,
            poster_path,
            release_date,
            title,
            video,
            vote_average,
            vote_count,
          }) => (
            <Col className="gutter-row" xxl={3} xl={4} lg={6} md={8} xs={12} key={id}>
              <Link to={`/movies/${id}`}>
                <Card
                  bordered={false}
                  hoverable
                  cover={<img alt="example" src={`${imagePrefix}/${poster_path}`} style={{ borderRadius: 10 }} />}
                >
                  <h4><a href> {title} </a></h4>
                  <span class="ant-card-meta-description">{release_date} </span>
                </Card>
              </Link>
            </Col>
          ))
        }
      </Row>
    </Page>
  );
};

export default connect(null, mapDispatchToProps)(MovieList);
