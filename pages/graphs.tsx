import { Text } from '../src/components/atoms';
import { PrimaryLayout } from '../src/components/layout/primary';
import { Page } from '../src/components/layout/page';
import { withLayout } from '@moxy/next-layout';
import { Head } from '../src/components/layout/head';

const Graphs = () => {
    return (
        <>
            <Head title="Graphs" />
            <Page>
                <Text>Graphs page</Text>
            </Page>
        </>
    );
};

export default withLayout(<PrimaryLayout />)(Graphs);
