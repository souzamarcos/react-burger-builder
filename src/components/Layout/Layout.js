import React from 'react';

import Aux from '../../hoc/Aux';

const Layout = (props) => (
    <>
        <div>
            Toolbar, SideDrawer, Backdrop
        </div>
        <main>
            {props.children}
        </main>
    </>
);

export default Layout;