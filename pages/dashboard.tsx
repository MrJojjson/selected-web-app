import { Text } from '../src/components/atoms';
import { PrimaryLayout } from '../src/components/layout/primary';
import { Page } from '../src/components/layout/page';
import { withLayout } from '@moxy/next-layout';
import { Head } from '../src/components/layout/head';

const Dashboard = () => {
    return (
        <Page>
            <Head title="Dashboard" />

            <Text>Dashboard page</Text>
        </Page>
    );
};

export default withLayout(<PrimaryLayout />)(Dashboard);
