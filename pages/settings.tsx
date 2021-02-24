import { withLayout } from '@moxy/next-layout';
import { Text } from '../src/components/atoms';
import { Head } from '../src/components/layout/head';
import { Page } from '../src/components/layout/page';
import { PrimaryLayout } from '../src/components/layout/primary';
import { LanguagePicker } from '../src/components/molecules/languagePicker.tsx';
import { useLang } from '../src/hooks/useLang';

const Settings = () => {
    const lang = useLang();
    return (
        <Page>
            <Head title="Settings" />
            <Text>{lang.test}</Text>
            <LanguagePicker />
        </Page>
    );
};
export default withLayout(<PrimaryLayout />)(Settings);
