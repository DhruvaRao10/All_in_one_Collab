import os
import fitz
import camelot
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import PyPDFLoader
from langchain.document_loaders import TextLoader
from langchain_groq import ChatGroq
from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_core.prompts import PromptTemplate
from backend import PDFQASystem  


# Load environment variables
load_dotenv()
groq_api_key = os.getenv("GroqDemoKey")

def extract_text_from_pdf(pdf_file):
    text = ''
    with fitz.open(pdf_file) as doc:
        for page in doc:
            text += page.get_text()
    return text

def parse_tables(pdf_file):
    tables = camelot.read_pdf(pdf_file, pages='all')
    return tables


def format_docs(docs):
    return "\n\n".join([doc.page_content for doc in docs])


def generate_embeddings_and_answer_query(pdf_file_path, user_query , top_k=3):
    #  Extract text from the PDF
    text = extract_text_from_pdf(pdf_file_path)

    # Create embeddings from the text
    embeddings_model = SentenceTransformerEmbeddings(model_name='all-MiniLM-L6-v2')
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    texts = text_splitter.split_text(text)
    loader = TextLoader(texts)
    documents = loader.load()   
    embeddings = embeddings_model.embed_documents(documents)

    # Create an instance of PDFQASystem
    pdf_qa_system = PDFQASystem(pdf_file_path)
    pdf_qa_system.create_embeddings()
    pdf_qa_system.add_live_embeddings(texts, embeddings)
    print("Live embeddings added successfully")
    pdf_qa_system.create_retriever_and_rag_chain()


    # Use the RetrievalQA chain to answer the query
    answer = pdf_qa_system.process_pdf_and_answer_query(user_query)
    return answer


