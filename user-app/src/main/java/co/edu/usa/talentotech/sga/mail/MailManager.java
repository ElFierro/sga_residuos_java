package co.edu.usa.talentotech.sga.mail;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@Component
public class MailManager {

	JavaMailSender javaMailSender;
	
	@Value("${spring.mail.username}")
	private String sender;
	
	public MailManager(JavaMailSender javaMailSender)  {
		this.javaMailSender = javaMailSender;
	}
	
	public void sendMessage(String name, String email, String password) {
		MimeMessage message = javaMailSender.createMimeMessage();
		String content = MessageHtml.TEMPLATE_EMAIL;
		try {
			message.setSubject("Credenciales de acceso | Sga Residuos");
			MimeMessageHelper helper = new MimeMessageHelper (message, true);
			helper.setTo(email);
			
			content =  setCodeInTemplate(content, name, email, password);
			helper.setText(content, true);
			helper.setFrom(sender);;
			javaMailSender.send(message);
			
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	}
	
	private String setCodeInTemplate(String templateCode, String name, String email, String password) {
		return templateCode.replace("userName", name).replace("userEmail",email).replace("userPassword",password );
	}
}
