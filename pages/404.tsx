import { Header, Link } from '../src/components/atoms';
import { Page } from '../src/components/layout/page';
import { PrimaryLayout } from '../src/components/layout/primary';
import { withLayout } from '@moxy/next-layout';

const FourOhFour = () => {
    return (
        <Page>
            <div>
                <Header>404 - sheeeeeeeeiiiiitt!</Header>
                <Link pathname="/" title="go home please" />
            </div>
        </Page>
    );
};

export default withLayout(<PrimaryLayout />)(FourOhFour);
