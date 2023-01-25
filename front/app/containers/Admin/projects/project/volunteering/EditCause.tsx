import React, { useState, useEffect } from 'react';
import clHistory from 'utils/cl-router/history';
import { isNilOrError } from 'utils/helperUtils';
import { convertUrlToUploadFile } from 'utils/fileUtils';

// Services
import { updateCause } from 'services/causes';
import useCause from 'hooks/useCause';

// Components
import { SectionTitle, SectionDescription } from 'components/admin/Section';
import CauseForm, { FormValues } from './CauseForm';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// Typing
import { UploadFile } from 'typings';
import { useParams } from 'react-router-dom';

type Image = UploadFile[] | null;

const EditCause = () => {
  const { projectId, causeId } = useParams() as {
    projectId: string;
    causeId: string;
  };

  const cause = useCause({ causeId });

  const [localImage, setLocalImage] = useState<Image>(null);

  // Load the API cause object as a local image
  useEffect(() => {
    (async () => {
      if (!isNilOrError(cause) && localImage === null) {
        if (cause.attributes.image?.large) {
          const newImage = await convertUrlToUploadFile(
            cause.attributes.image.large
          );
          if (newImage) {
            setLocalImage([newImage]);
          }
        } else {
          setLocalImage([]);
        }
      }
    })();
  }, [cause, localImage]);

  const handleOnSubmit = async (formValues: FormValues) => {
    const { title_multiloc, description_multiloc, image } = formValues;

    if (title_multiloc && description_multiloc) {
      try {
        await updateCause(causeId, {
          description_multiloc,
          title_multiloc,
          image: (image && image[0]?.base64) || null,
        });

        clHistory.push(`/admin/projects/${projectId}/volunteering`);
      } catch {
        // Do nothing
      }
    }
  };

  if (isNilOrError(cause)) {
    return null;
  }

  return (
    <div>
      <SectionTitle>
        <FormattedMessage {...messages.editCauseTitle} />
      </SectionTitle>
      <SectionDescription>
        <FormattedMessage {...messages.editCauseSubtitle} />
      </SectionDescription>
      {localImage && (
        <CauseForm
          onSubmit={handleOnSubmit}
          defaultValues={{
            title_multiloc: cause.attributes.title_multiloc,
            description_multiloc: cause.attributes.description_multiloc,
            image: localImage,
          }}
        />
      )}
    </div>
  );
};

export default EditCause;
