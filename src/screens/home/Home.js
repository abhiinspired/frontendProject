import SingleLineImageList from '../../Components/ImageList';
import './Home.css';
import ReleasedMoviesList from '../../Components/ReleasedMoviesList'


export default function Home(){
    return (
        <div>
            <div className="upcomingMovies">Upcoming Movies</div>
            <SingleLineImageList />
            <div className="releasedMoviesFlexContainer">
                <ReleasedMoviesList className="releasedMoviesGrid"/>
                <div className="movieFilter">Hello</div>
            </div>
        </div>
    );
}