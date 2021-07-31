import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page/Page';
import { Row, Col, Progress } from 'antd';
import { getDetail } from './actions';

const imagePrefix = 'https://www.themoviedb.org//t/p/w300_and_h450_bestv2/';

const mapDispatchToProps = {
  getDetailAction: getDetail
};

const MovieList = ({
  match,
  getDetailAction
}) => {
  const { id } = match.params;
  const [movieDetail, setListMovieDetail] = useState({});
  const fetchListMovie = async () => {
    const movie = await getDetailAction(id);
    setListMovieDetail(movie);
  }

  useEffect(() => {
    fetchListMovie();
    // eslint-disable-next-line
  }, []);
  const { poster_path, release_date, title, backdrop_path, genres = [], overview, tagline, vote_average } = movieDetail;
  const movieTypes = genres.map(item => item.name).join(', ');

  return (
    <Page helmet="Latest & Popular Movie" siderRight={false} siderLeft={false}>
      {movieDetail.title && <section style={{
        minHeight: '510px',
        height: 'calc(100vh / 2.5)',
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
        marginBottom: 10,
        backgroundImage: `url("https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/${poster_path}")`
      }}>
        <Row gutter={[16, 16]} style={{ backgroundImage: 'linear-gradient(to right, rgba(12.94%, 15.29%, 24.31%, 1.00) 150px, rgba(12.94%, 15.29%, 24.31%, 0.84) 100%)' }}>
          <Col className="gutter-row" xxl={4} xl={4} lg={2} md={1} xs={0}> </Col>
          <Col className="gutter-row" xxl={5} xl={6} lg={8} md={10} xs={11}>
            <div style={{padding: '30px'}}>
              <img alt="example" src={`${imagePrefix}/${backdrop_path}`} style={{ borderRadius: 10 }} />
            </div>
          </Col>
          <Col className="gutter-row" xxl={12} xl={12} lg={12} md={12} xs={12}>
            <div style={{padding: '30px', color: 'white' }}>
              <h2 style={{fontSize: '2.2rem', fontWeight: '600', margin: 0, color: 'white' }}> {title} ({new Date(release_date).getFullYear()})</h2>
              <p> {movieTypes}</p>
              <Progress type="circle" percent={vote_average*10} width={50} strokeColor="green" style={{color: 'white'}}/> User Scores
              <h3 style={{ marginTop: 10, color: 'white', fontSize: '1.1rem', fontWeight: 400, opacity: 0.7, fontStyle: 'italic' }}> {tagline}</h3>
              <h3 style={{ marginTop: 10, color: 'white', fontSize: '1.3rem' }}> Overview </h3>
              <p style={{fontWeight: 200}}> {overview} </p>
            </div>
          </Col>
        </Row>
      </section>}
    </Page>
  );
};

export default connect(null, mapDispatchToProps)(MovieList);
