// libraries
import React from 'react';
import { Helmet } from 'react-helmet';

// i18n
import { injectIntl, useIntl } from 'utils/cl-intl';
import messages from './messages';

// components
import Fragment from 'components/Fragment';

import {
  Container,
  StyledContentContainer,
  PageContent,
  PageTitle,
} from 'containers/PagesShowPage';
import { Box } from '@citizenlab/cl2-component-library';
// styles
import QuillEditedContent from 'components/UI/QuillEditedContent';

const CookiePolicy = () => {
  const { formatMessage } = useIntl();

  return (
    <Container className="e2e-page-cookie-policy" data-testid="cookiePolicy">
      <Helmet>
        <title>{formatMessage(messages.cookiePolicyTitle)}</title>
        <meta
          name="description"
          content={formatMessage(messages.cookiePolicyDescription)}
        />
      </Helmet>

      <PageContent>
        <StyledContentContainer>
          <Fragment name="pages/cookie-policy/content">
            <PageTitle>{formatMessage(messages.cookiePolicyTitle)}</PageTitle>
            <Box>
              <QuillEditedContent>
                <p>{formatMessage(messages.intro)}</p>
                <h2>{formatMessage(messages.whatDoWeUseCookiesFor)}</h2>

                <h3>{formatMessage(messages.essentialTitle)}</h3>
                <p>{formatMessage(messages.essentialContent)}</p>

                <h3>{formatMessage(messages.externalTitle)}</h3>
                <p>{formatMessage(messages.externalContent)}</p>
              </QuillEditedContent>
            </Box>
          </Fragment>
        </StyledContentContainer>
      </PageContent>
    </Container>
  );
};

export default injectIntl(CookiePolicy);
