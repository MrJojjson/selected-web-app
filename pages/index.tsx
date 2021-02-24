import { Text } from '../src/components/atoms';
import { Page } from '../src/components/layout/page';
import { PrimaryLayout } from '../src/components/layout/primary';
import { withLayout } from '@moxy/next-layout';
import { Head } from '../src/components/layout/head';
const Home = () => {
    return (
        <Page>
            <Head title="Selected management" />

            <Text>Home page</Text>
        </Page>
    );
};

export default withLayout(<PrimaryLayout />)(Home);
