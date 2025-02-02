import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from '../hooks/useTranslation';

const FAQ = () => {
  const { translate:t } = useTranslation();
  return (
    <Box m="20px" sx={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#2c3e50', mb: 4 }}>
        {t("body.FAQ")}
      </Typography>

      {/* Question 1 */}
      <Accordion sx={{ mb: 2, boxShadow: 3, borderRadius: '8px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#3498db' }} />}>
          <Typography variant="h6" sx={{ fontWeight: '600', color: '#34495e' }}>
            {t("faq.q1")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: '#7f8c8d' }}>
          {t("faq.a1")}
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Question 2 */}
      <Accordion sx={{ mb: 2, boxShadow: 3, borderRadius: '8px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#3498db' }} />}>
          <Typography variant="h6" sx={{ fontWeight: '600', color: '#34495e' }}>
          {t("faq.q2")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: '#7f8c8d' }}>
            {t("faq.a2")}
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Question 3 */}
      <Accordion sx={{ mb: 2, boxShadow: 3, borderRadius: '8px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#3498db' }} />}>
          <Typography variant="h6" sx={{ fontWeight: '600', color: '#34495e' }}>
          {t("faq.q3")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: '#7f8c8d' }}>
          {t("faq.a3")}
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Question 4 */}
      <Accordion sx={{ mb: 2, boxShadow: 3, borderRadius: '8px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#3498db' }} />}>
          <Typography variant="h6" sx={{ fontWeight: '600', color: '#34495e' }}>
          {t("faq.q4")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: '#7f8c8d' }}>
          {t("faq.a4")}
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Question 5 */}
      <Accordion sx={{ mb: 2, boxShadow: 3, borderRadius: '8px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#3498db' }} />}>
          <Typography variant="h6" sx={{ fontWeight: '600', color: '#34495e' }}>
          {t("faq.q5")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: '#7f8c8d' }}>
          {t("faq.a5")}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;