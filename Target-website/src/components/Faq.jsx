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
            What is Target for Engineering?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: '#7f8c8d' }}>
            Target for Engineering is a platform dedicated to providing high-quality engineering solutions, resources, and support to help individuals and organizations achieve their goals in the engineering field.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Question 2 */}
      <Accordion sx={{ mb: 2, boxShadow: 3, borderRadius: '8px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#3498db' }} />}>
          <Typography variant="h6" sx={{ fontWeight: '600', color: '#34495e' }}>
            How can I contact support?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: '#7f8c8d' }}>
            You can contact our support team by emailing <strong>support@targetforengineering.com</strong> or by calling our helpline at <strong>+1 (123) 456-7890</strong>.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Question 3 */}
      <Accordion sx={{ mb: 2, boxShadow: 3, borderRadius: '8px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#3498db' }} />}>
          <Typography variant="h6" sx={{ fontWeight: '600', color: '#34495e' }}>
            What services do you offer?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: '#7f8c8d' }}>
            We offer a wide range of services, including engineering consulting, project management, training programs, and technical support for various engineering disciplines.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Question 4 */}
      <Accordion sx={{ mb: 2, boxShadow: 3, borderRadius: '8px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#3498db' }} />}>
          <Typography variant="h6" sx={{ fontWeight: '600', color: '#34495e' }}>
            Do you provide custom solutions?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: '#7f8c8d' }}>
            Yes, we specialize in creating custom engineering solutions tailored to your specific needs. Contact us to discuss your requirements, and we'll design a solution that fits your goals.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Question 5 */}
      <Accordion sx={{ mb: 2, boxShadow: 3, borderRadius: '8px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#3498db' }} />}>
          <Typography variant="h6" sx={{ fontWeight: '600', color: '#34495e' }}>
            Is there a free trial available?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: '#7f8c8d' }}>
            Yes, we offer a free trial for some of our services. Please reach out to our team to learn more about the available options and eligibility.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;