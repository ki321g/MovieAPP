import React from 'react';
import PlaylistPopup from '../components/playlistPopup';
import PlaylistDialog from '../components/playlistDialog';
import TemporaryDrawer from '../components/playlistDrawer'
const HomePage: React.FC = () => {
	

	return (
		<>
			<PlaylistPopup/>

			<br /><br /><br /><br />
			<PlaylistDialog/>
			<br /><br /><br /><br />
			<TemporaryDrawer/>
		</>
	);
};
export default HomePage;
