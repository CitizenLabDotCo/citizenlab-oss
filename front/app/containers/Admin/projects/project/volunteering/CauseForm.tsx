import React from 'react';

// typings
import { Multiloc, UploadFile } from 'typings';

// form
import { FormProvider, useForm } from 'react-hook-form';
import { SectionField } from 'components/admin/Section';
import InputMultilocWithLocaleSwitcher from 'components/HookForm/InputMultilocWithLocaleSwitcher';
import Feedback from 'components/HookForm/Feedback';
import { yupResolver } from '@hookform/resolvers/yup';
import { mixed, object } from 'yup';
import validateAtLeastOneLocale from 'utils/yup/validateAtLeastOneLocale';
import { handleHookFormSubmissionError } from 'utils/errorUtils';
import QuillMultilocWithLocaleSwitcher from 'components/HookForm/QuillMultilocWithLocaleSwitcher';
import ImagesDropzone from 'components/HookForm/ImagesDropzone';

// components
import Button from 'components/UI/Button';
import { Box } from '@citizenlab/cl2-component-library';

// intl
import messages from './messages';
import { useIntl } from 'utils/cl-intl';

export interface FormValues {
  title_multiloc: Multiloc;
  description_multiloc: Multiloc;
  image?: UploadFile[] | null;
}

type PageFormProps = {
  onSubmit: (formValues: FormValues) => void | Promise<void>;
  defaultValues?: FormValues;
};

const CauseForm = ({ onSubmit, defaultValues }: PageFormProps) => {
  const { formatMessage } = useIntl();
  const schema = object({
    title_multiloc: validateAtLeastOneLocale(
      formatMessage(messages.emptyTitleErrorMessage)
    ),
    description_multiloc: validateAtLeastOneLocale(
      formatMessage(messages.emptyDescriptionErrorMessage)
    ),
    image: mixed().nullable(),
  });

  const methods = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(schema),
  });

  console.log(methods.getValues('image'));

  const onFormSubmit = async (formValues: FormValues) => {
    try {
      await onSubmit(formValues);
    } catch (error) {
      handleHookFormSubmissionError(error, methods.setError);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onFormSubmit)}>
        <SectionField>
          <Feedback />
          <InputMultilocWithLocaleSwitcher
            name="title_multiloc"
            label={formatMessage(messages.causeTitleLabel)}
            type="text"
          />
        </SectionField>
        <SectionField>
          <QuillMultilocWithLocaleSwitcher
            name="description_multiloc"
            noImages
            noVideos
            limitedTextFormatting
            label={formatMessage(messages.causeDescriptionLabel)}
            labelTooltipText={formatMessage(messages.causeDescriptionTooltip)}
            withCTAButton
          />
        </SectionField>
        <SectionField>
          <ImagesDropzone
            name="image"
            imagePreviewRatio={120 / 480}
            maxImagePreviewWidth="500px"
            acceptedFileTypes={{
              'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
            }}
            label={formatMessage(messages.causeImageLabel)}
            inputLabel={formatMessage(messages.causeImageLabel)}
          />
        </SectionField>
        <Box display="flex">
          <Button type="submit" processing={methods.formState.isSubmitting}>
            {formatMessage(messages.saveCause)}
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default CauseForm;
