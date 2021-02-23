import { Header, Link } from '../src/components/atoms';
import { Page } from '../src/components/layout/page';

export default function FourOhFour() {
    return (
        <Page>
            <div>
                <Header>404 - sheeeeeeeeiiiiitt!</Header>
                <Link pathname="/" title="go home please" />
            </div>
        </Page>
    );
}
