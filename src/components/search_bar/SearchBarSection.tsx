import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBarSection.css';

export default function SearchBarSection() {
  return (
    <div className="container">
        <div className="row justify-content-center my-5">
            <div className="col-12 col-md-8 col-lg-6">
                <div className="search-container position-relative">
                    <form className="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            className="search-icon feather feather-search">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input className="form-control search-input ps-5" type="search"
                            placeholder="Pesquisar serviços..." aria-label="Search" />
                        <button className="btn btn-search ms-2" type="submit">Pesquisar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}
