import '../css/right-sidebar.css';
import { users } from '../data/data';
import Search from './Search';
import ProfileBar from './ProfileBar';
import UserListRight from './UserListRight';
export default function SideBar() {
  return (
    <>
      <div className="right-sidebar">
        <ProfileBar />
        <Search />
        <UserListRight users={users} />
      </div>
    </>
  );
}
