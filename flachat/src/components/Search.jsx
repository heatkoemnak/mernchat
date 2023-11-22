import SearchIcon from '@mui/icons-material/Search';
import '../css/search.css'
export default function Search() {
  return (
    <div className="chat-search">
      <SearchIcon className="icon-search" />
      <input type="text" placeholder="search for chat" />
    </div>
  );
}
